// Page Inventory Analytics Tool - Frontend JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const urlInput = document.getElementById("urlInput");
  const namingModeRadios = document.querySelectorAll(
    'input[name="namingMode"]'
  );
  const prefixInput = document.getElementById("prefixInput");
  const customPrefix = document.getElementById("customPrefix");
  const customNamesSection = document.getElementById("customNamesSection");
  const customNamesContainer = document.getElementById("customNamesContainer");
  const processBtn = document.getElementById("processBtn");
  const progressSection = document.getElementById("progressSection");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");
  const downloadSection = document.getElementById("downloadSection");
  const errorSection = document.getElementById("errorSection");
  const errorMessage = document.getElementById("errorMessage");

  // Event listeners
  namingModeRadios.forEach((radio) => {
    radio.addEventListener("change", handleNamingModeChange);
  });

  urlInput.addEventListener("input", handleUrlInputChange);
  processBtn.addEventListener("click", processAnalytics);

  // Handle naming mode changes
  function handleNamingModeChange() {
    const selectedMode = document.querySelector(
      'input[name="namingMode"]:checked'
    ).value;

    // Hide all sections first
    prefixInput.style.display = "none";
    customNamesSection.style.display = "none";

    // Show relevant section
    if (selectedMode === "prefix") {
      prefixInput.style.display = "block";
    } else if (selectedMode === "custom") {
      customNamesSection.style.display = "block";
      generateCustomNameInputs();
    }
  }

  // Handle URL input changes
  function handleUrlInputChange() {
    const urls = getUrlsFromInput();
    if (urls.length > 0) {
      processBtn.disabled = false;
    } else {
      processBtn.disabled = true;
    }
  }

  // Get URLs from input
  function getUrlsFromInput() {
    const input = urlInput.value.trim();
    if (!input) return [];

    return input
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
  }

  // Generate custom name inputs
  function generateCustomNameInputs() {
    const urls = getUrlsFromInput();
    customNamesContainer.innerHTML = "";

    if (urls.length === 0) {
      customNamesContainer.innerHTML =
        '<p class="text-muted">Enter URLs above to generate custom name inputs.</p>';
      return;
    }

    urls.forEach((url, index) => {
      const urlParts = url.split("/");
      const deptName = urlParts[urlParts.length - 2] || "department";

      const inputGroup = document.createElement("div");
      inputGroup.className = "custom-name-input";
      inputGroup.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <small class="text-muted">${url}</small>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" 
                               data-url="${url}" 
                               placeholder="${deptName}_analytics.xlsx"
                               value="${deptName}_analytics.xlsx">
                    </div>
                </div>
            `;
      customNamesContainer.appendChild(inputGroup);
    });
  }

  // Process analytics
  async function processAnalytics() {
    const urls = getUrlsFromInput();
    if (urls.length === 0) {
      showError("Please enter at least one URL.");
      return;
    }

    // Get naming mode and custom data
    const namingMode = document.querySelector(
      'input[name="namingMode"]:checked'
    ).value;
    const customPrefixValue = customPrefix.value.trim();
    const customNames = {};

    if (namingMode === "custom") {
      const customInputs =
        customNamesContainer.querySelectorAll("input[data-url]");
      customInputs.forEach((input) => {
        const url = input.getAttribute("data-url");
        const filename = input.value.trim();
        if (filename) {
          customNames[url] = filename.endsWith(".xlsx")
            ? filename
            : filename + ".xlsx";
        }
      });
    }

    // Prepare request data
    const requestData = {
      urls: urls,
      namingMode: namingMode,
      customPrefix: customPrefixValue,
      customNames: customNames,
    };

    // Show progress
    showProgress();
    hideResults();
    hideError();

    try {
      const response = await fetch("/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        showResults(data);
      } else {
        let errorMessage =
          data.error || "An error occurred while processing the analytics.";

        // Handle setup instructions for missing credentials
        if (data.setup_instructions) {
          errorMessage +=
            "\n\nSetup Instructions:\n" + data.setup_instructions.join("\n");
        }

        showError(errorMessage);
      }
    } catch (error) {
      showError("Network error: " + error.message);
    } finally {
      hideProgress();
    }
  }

  // Show progress
  function showProgress() {
    progressSection.style.display = "block";
    progressBar.style.width = "0%";
    progressText.textContent = "Initializing...";

    // Simulate progress updates
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + "%";

      if (progress < 30) {
        progressText.textContent = "Connecting to Google Analytics...";
      } else if (progress < 60) {
        progressText.textContent = "Fetching analytics data...";
      } else if (progress < 90) {
        progressText.textContent = "Generating reports and AI insights...";
      }
    }, 500);

    // Store interval for cleanup
    window.progressInterval = progressInterval;
  }

  // Hide progress
  function hideProgress() {
    progressSection.style.display = "none";
    if (window.progressInterval) {
      clearInterval(window.progressInterval);
    }
  }

  // Show results
  function showResults(data) {
    resultsContainer.innerHTML = "";

    if (data.results && data.results.length > 0) {
      let successCount = 0;
      let errorCount = 0;

      data.results.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.className = `result-item ${
          result.success ? "result-success" : "result-error"
        }`;

        if (result.success) {
          successCount++;
          resultItem.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas fa-check-circle result-icon text-success"></i>
                            <div>
                                <strong>${result.filename}</strong><br>
                                <small class="text-muted">${result.url}</small>
                                ${
                                  result.stats
                                    ? `
                                    <br><small class="text-muted">
                                        ${result.stats.total_pages} pages, ${result.stats.total_views} views 
                                        (${result.stats.section_traffic_percentage}% of site traffic)
                                    </small>
                                `
                                    : ""
                                }
                            </div>
                        </div>
                    `;
        } else {
          errorCount++;
          resultItem.innerHTML = `
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-triangle result-icon text-danger"></i>
                            <div>
                                <strong>Error processing:</strong> ${result.url}<br>
                                <small class="text-muted">${result.error}</small>
                            </div>
                        </div>
                    `;
        }

        resultsContainer.appendChild(resultItem);
      });

      // Show summary
      const summaryItem = document.createElement("div");
      summaryItem.className = "alert alert-info mt-3";
      summaryItem.innerHTML = `
                <strong>Processing Complete:</strong> ${successCount} successful, ${errorCount} failed
            `;
      resultsContainer.appendChild(summaryItem);

      // Show download button if any files were created
      if (data.has_download) {
        downloadSection.style.display = "block";
      }
    }

    resultsSection.style.display = "block";
  }

  // Hide results
  function hideResults() {
    resultsSection.style.display = "none";
    downloadSection.style.display = "none";
  }

  // Show error
  function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = "block";
  }

  // Hide error
  function hideError() {
    errorSection.style.display = "none";
  }

  // Initialize
  handleUrlInputChange();
  handleNamingModeChange();
});

const SubmitButton = document.querySelector(".submit-button");
const InputFile = document.querySelector("#fileInput");
const ImageResult = document.querySelector(".image-result");
const Loader = document.querySelector("#loader");

const url = "https://api.remove.bg/v1.0/removebg";
const api_key = "1x2dYJRkn9nBszAiNz9TgcQN";

async function handleSubmit() {
  if (InputFile.files[0] == "" || InputFile.files.length === 0) {
    alert("Please select a file first");
    return;
  }
  // Show the loader before making the request
  Loader.style.display = "block"; // Loader displayed here

  const image = InputFile.files[0];
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const maxRetries = 3;
  let retries = 0;

  async function performRequest() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-Api-key": api_key,
        },
        body: formData,
      });

      if (response.ok) {
        document.querySelector(".result-div").style.display = "block";
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // const newImage = document.createElement("img");
        // newImage.src = imageUrl;
        // document.body.appendChild(newImage);
        ImageResult.src = imageUrl;
      } else if (response.status === 429 && retries < maxRetries) {
        // Retry if rate-limited
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
        await performRequest();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Hide the loader after completion (whether successful or not)
      Loader.style.display = "none"; // Loader hidden here
    }
  }

  await performRequest();
}

SubmitButton.addEventListener("click", handleSubmit);

const DownloadButton = document.querySelector("#download-button");

DownloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = ImageResult.src;
  link.download = "removed bg.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

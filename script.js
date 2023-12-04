const SubmitButton = document.querySelector(".submit-button");
const InputFile = document.querySelector("#fileInput");
const ImageResult = document.querySelector(".image-result");

const url = "https://api.remove.bg/v1.0/removebg";
const api_key = "1x2dYJRkn9nBszAiNz9TgcQN";

async function handleSubmit() {
  const image = InputFile.files[0];
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  await fetch(url, {
    method: "POST",
    headers: {
      "X-Api-key": api_key,
    },
    body: formData,
  })
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      console.log(blob);
      const imageURl = URL.createObjectURL(blob);
      const NewImage = document.createElement("img");
      NewImage.src = imageURl;
      document.body.appendChild(NewImage);
    })
    .catch();
}

const SubmitButton = document.querySelector(".submit-button");
console.log(SubmitButton);
const InputFile = document.querySelector("#fileInput");
console.log(InputFile);

const url = "https://sdk.photoroom.com/v1/segment";
let apiKey = "4135aa13cc5a184b0547e0c1c668b077d1446fef";

let pressed = false;

const handleSubmit = async () => {
  if (pressed === true) {
    SubmitButton.disable = true;
    return;
  }
  pressed = true;
  //now user have pressed the button so before submit we need to ensure that the user selected file
  if (!InputFile.file || InputFile.files.length === 0) {
    alert("please select a file");
    return;
  }

  // now after we are checking the user has enter a file or not then we need to make a request to remove background
  let options = {
    method: "POST",
    headers: {
      Accept: "image/png, application/json",
      "x-api-key": "4135aa13cc5a184b0547e0c1c668b077d1446fef",
    },
    body: formData,
  };

  const format = InputFile.files[0].name.split(".");

  const formData = new FormData();
  formData.append("image_file", InputFile.files[0]);
  formData.append("format", format[format.length - 1]);

  const response = await fetch(url, options);
  let data = await response.json();
  console.log(data);
};

SubmitButton.addEventListener("click", handleSubmit);

FEATURES.forEach((f, i) => {

  const block = document.createElement("div");
  block.className = "feature-block";

  // LABEL
  const label = document.createElement("div");
  label.className = "feature-label";
  label.innerText = `${f.name} (${f.unit})`;

  // INPUT ROW
  const row = document.createElement("div");
  row.className = "input-row";

  const input = document.createElement("input");
  input.type = "number";
  input.value = f.default;
  input.id = `f${i}`;

  const naWrapper = document.createElement("label");
  naWrapper.className = "na-wrapper";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `na${i}`;

  const text = document.createElement("span");
  text.innerText = "NA";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      input.value = "";
      input.disabled = true;
    } else {
      input.disabled = false;
      input.value = f.default;
    }
  });

  naWrapper.appendChild(checkbox);
  naWrapper.appendChild(text);

  row.appendChild(input);
  row.appendChild(naWrapper);

  block.appendChild(label);
  block.appendChild(row);

  container.appendChild(block);
});
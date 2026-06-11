FEATURES.forEach((f, i) => {

  const row = document.createElement("div");
  row.className = "feature-block";

  // LEFT
  const label = document.createElement("div");
  label.className = "feature-label";

  const name = document.createElement("div");
  name.className = "feature-name";
  name.innerText = f.name;

  const unit = document.createElement("div");
  unit.className = "feature-unit";
  unit.innerText = f.unit;

  label.appendChild(name);
  label.appendChild(unit);

  // RIGHT CONTROLS
  const controls = document.createElement("div");
  controls.className = "controls";

  const input = document.createElement("input");
  input.type = "number";
  input.value = f.default;
  input.id = `f${i}`;

  const na = document.createElement("label");
  na.className = "na-wrapper";

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

  na.appendChild(checkbox);
  na.appendChild(text);

  controls.appendChild(input);
  controls.appendChild(na);

  row.appendChild(label);
  row.appendChild(controls);

  document.querySelector(".form").appendChild(row);
});
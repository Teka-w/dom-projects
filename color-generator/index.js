const shuffleButton = document.getElementById("shuffle-button");
const statusElement = document.getElementById("text");
const colorsPalette = document.getElementById("colors");

const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

let selectedFamilies = ["red", "amber", "emerald", "sky", "violet", "pink"].map((name) => families.find((family) => family.name === name));

const hslToHex = (hue, saturation, light) => {
  const l = light / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;
    const value = l - amplitude * Math.max(-1, Math.min(position - 3, 9 - position, 1));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    statusElement.textContent = `${hex} is copied`;

    setTimeout(() => {
        statusElement.textContent = "6 palettes · 60 shades. Click to copy a HEX background color.";
    }, 2000);
};

colorsPalette.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-hex]");
    if (!button) return;

    copyColor(button.dataset.hex);
});


const renderPalette = () => {
    colorsPalette.innerHTML = "";
    
    selectedFamilies.forEach((family) => {
        const colorButtons = shades
        .map((shade, index) => {
            const hex = hslToHex(family.hue, family.saturation, lightness[index]);

            return `
                <button type="button" data-hex="${hex}" class="group min-w-0 cursor-pointer rounded-xl text-center">
                  <span style="background-color: ${hex};" class="block h-16 rounded-xl transition group-hover:-translate-y-1 group-hover:shadow-lg"></span>
                  <span class="mt-2 block text-xs font-medium tabular-nums text-zinc-300">${shade}</span>
                  <span class="mt-1 block pb-1 font-mono text-[9px] text-zinc-400">${hex}</span>
                </button>`
        })
        .join("");

        const template = `
            <div>
              <h2 class="mb-3 text-sm font-semibold capitalize text-zinc-200">${family.name}</h2>
              <div class="grid grid-cols-5 gap-2 sm:gap-3 lg:grid-cols-10">
                ${colorButtons}
              </div>
            </div>`;

        colorsPalette.innerHTML += template;   
    });
};

shuffleButton.addEventListener("click", () => {
    const remaining = [...families];
    selectedFamilies = [];

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        selectedFamilies.push(remaining[randomIndex]);
        remaining.splice(randomIndex, 1);
    }

    renderPalette();
    statusElement.textContent = "6 palettes · 60 shades. Click to copy a HEX background color."
})

renderPalette();

import { ColorPartial } from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
    interface Palette {
        primaryPurple?: ColorPartial;
        hint: Palette['primary'];
    }
    interface PaletteOptions {
        primaryPurple?: ColorPartial;
        hint?: PaletteOptions['primary'];
    }
}
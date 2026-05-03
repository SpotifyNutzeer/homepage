export interface Tool {
  label: string;
  value: string;
}

export const tools: Tool[] = [
  { label: 'OS',        value: 'Arch Linux' },
  { label: 'WM',        value: 'Hyprland' },
  { label: 'Bar/Shell', value: 'Quickshell' },
  { label: 'Shell',     value: 'fish' },
  { label: 'Editor',    value: 'Vim' },
  { label: 'Terminal',  value: 'kitty' },
  { label: 'Browser',   value: 'Brave' },
  { label: 'Music',     value: 'Tidal' }
];

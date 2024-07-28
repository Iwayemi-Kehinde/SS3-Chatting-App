export const HOST= "http://localhost:8000/"


export const colors = [
  "bg-[#712c4a57] text-[#ff005e] border-[1px] border-[#ff006faa]", // Original
  "bg-[#004d40] text-[#e0f2f1] border-[1px] border-[#00796b]", // Teal
  "bg-[#ffab91] text-[#ff6f61] border-[1px] border-[#ff5722]", // Coral
  "bg-[#9c27b0] text-[#e1bee7] border-[1px] border-[#ab47bc]", // Purple
  "bg-[#3f51b5] text-[#c5cae9] border-[1px] border-[#1e88e5]", // Blue
  "bg-[#f57c00] text-[#fff3e0] border-[1px] border-[#f57c00]"  // Orange
];

export const getColors = (color: number) => { 
    return colors[color]
}

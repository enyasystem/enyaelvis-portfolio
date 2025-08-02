export function getProjectImage(url: string) {
  // First try to load from local assets
  const localImage = `/projects/${url.replace(/https?:\/\//i, '').replace(/[./]/g, '-')}.jpg`;
  
  // Fallback to screenshot service with multiple providers
  const screenshotServices = [
    `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`,
    `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&width=1200&height=630&output=image&file_type=png&wait_for_event=load`,
    // Add more services as needed
  ];
  
  return {
    local: localImage,
    fallback: screenshotServices[0],
    placeholder: '/placeholder.jpg'
  };
}

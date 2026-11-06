const IMAGE_RE = /\.(png|jpe?g|webp|gif)$/i;

/* Certificate thumbnail — real image for image files, lazy PDF first-page render for PDFs */
export default function CertThumb({ file, title, className = '' }) {
  if (IMAGE_RE.test(file)) {
    return <img src={file} alt={title} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <iframe
      src={file}
      title={title}
      loading="lazy"
      className={`pointer-events-none h-full w-full border-0 bg-[#faf7f0] ${className}`}
    />
  );
}

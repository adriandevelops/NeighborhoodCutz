/**
 * The four corner brackets used on framed elements throughout the site.
 * Decorative, so it stays out of the accessibility tree.
 * Extra props are spread through, which is how the hero attaches
 * data-hero-crop for the intro timeline to find.
 */
export default function CropMarks({ className = '', ...rest }) {
  return (
    <div className={`crop ${className}`} aria-hidden="true" {...rest}>
      <i className="tl" />
      <i className="tr" />
      <i className="bl" />
      <i className="br" />
    </div>
  );
}

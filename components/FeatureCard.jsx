export default function FeatureCard({
  colSpan = "md:col-span-4",
  icon,
  category,
  title,
  description,
  isPrimary = false,
  children,
  onClick,
}) {
  if (isPrimary) {
    return (
      <div
        className={`${colSpan} bg-primary-container text-on-primary p-stack-md rounded-lg flex flex-col items-center justify-center text-center`}
        onClick={onClick}
      >
        {icon && (
          <div className="w-24 h-24 border-2 border-dashed border-on-primary/30 flex items-center justify-center mb-4 rounded-lg">
            <span className="material-symbols-outlined text-4xl" data-icon={icon}>
              {icon}
            </span>
          </div>
        )}
        <h3 className="font-headline-sm text-headline-sm mb-2">{title}</h3>
        <p className="font-label-md text-label-md opacity-90">{description}</p>
        {children}
      </div>
    );
  }

  // Standard Feature Card
  return (
    <div
      onClick={onClick}
      className={`${colSpan} p-stack-md border border-secondary-container bg-surface-container-low hover:bg-surface-container-high rounded-lg flex flex-col justify-between transition-colors duration-150 group ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div>
        {icon && (
          <span className="material-symbols-outlined text-primary mb-4 text-3xl" data-icon={icon}>
            {icon}
          </span>
        )}
        {category && (
          <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-wider">
            {category}
          </span>
        )}
        <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-150">
          {title}
        </h3>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            {description}
          </p>
        )}
      </div>
      {children && <div className="mt-stack-md">{children}</div>}
    </div>
  );
}

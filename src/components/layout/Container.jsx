export default function Container({
  as: Tag = 'div',
  size = 'default',
  className = '',
  children,
}) {
  const sizes = {
    default: 'max-w-7xl',
    narrow: 'max-w-3xl',
    form: 'max-w-2xl',
  };

  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}

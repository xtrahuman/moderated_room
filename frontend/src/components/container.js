export default function Container({
    children, 
    className, 
    ...rest}) {
    return (
      <div
        {...rest}
        className={`px-8 w-full ${className}`}
        >
        {children}
      </div>
    )
  }
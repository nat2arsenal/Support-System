export default function DropdownPanel({ children, id }) {
  return (
    <div className="dropdown-content" id={id}>
      <div className="dropdown-section">{children}</div>
    </div>
  );
}

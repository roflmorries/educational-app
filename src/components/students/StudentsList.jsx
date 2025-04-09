import StudentCard from "./StudentCard";

export default function StudentsList({ items, onEdit, onDelete }) {
  return (
    <div>
      {items.map((item) => (
        <StudentCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
      ))}
    </div>
  );
}

import CourseCard from "./CourseCard";

export default function CoursesList({ items, onEdit, onDelete }) {
  return (
    <div>
      {items.map((item) => (
        <CourseCard key={item._id} onEdit={onEdit} onDelete={onDelete} {...item} />
      ))}
    </div>
  );
}

export default function PersonSummary({ person, imageClassName = 'node-image' }) {
  return (
    <>
      <img src={person.image} alt={person.name} className={imageClassName} />
      <div className="node-info">
        <h3 className="node-name">{person.name}</h3>
        <p className="node-position">{person.position}</p>
        <p className="node-company">{person.company}</p>
      </div>
    </>
  );
}

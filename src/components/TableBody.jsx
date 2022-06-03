const TableBody = ({ onClickShowDetails, projects }) => {
  return (
    <tbody>
      {projects.map((project, index) => (
        <tr
          onClick={() => onClickShowDetails(projects[index])}
          key={project.id}
        >
          <td>{index}</td>
          <td>{project.name}</td>
          <td>{project.endDate}</td>
          <td>{project.state}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

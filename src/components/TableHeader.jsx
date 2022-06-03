const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((columnName) => (
          <th key={columnName}>{columnName}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

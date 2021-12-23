export default function List({ contacts, closeModal }) {
  return (
    <div>
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
          <thead>
        <th>ID</th>
        <th>Name</th>
        </thead>
            <tbody >
        {contacts.map((contact) => (
          <tr align="center"  onClick={closeModal} >
            <td key={contact.id}>
              <span>{contact.id}</span>
            </td>
            <td>
              <span>{contact.name}</span>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

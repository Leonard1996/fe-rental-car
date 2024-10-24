import Filter from '../../components/Filter';

export default function FilterContainer({ filters, callback }) {
  return (
    <div style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none', paddingLeft: '1.25rem' }}>
      {filters.map(({ label, showIcon = true, customStyles, id }) => {
        return (
          <div key={id} style={{ marginRight: '.5rem' }}>
            <Filter label={label} callback={callback} showIcon={showIcon} customStyles={customStyles} id={id} />
          </div>
        );
      })}
    </div>
  );
}

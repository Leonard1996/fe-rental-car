import Filter from '../../components/Filter';

export default function FilterContainer({ filters }) {
  return (
    <div style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none' }}>
      {filters.map(({ label, callback, showIcon = true, customStyles }) => {
        return (
          <div key={label} style={{ marginRight: '.5rem' }}>
            <Filter label={label} callback={callback} showIcon={showIcon} customStyles={customStyles} />
          </div>
        );
      })}
    </div>
  );
}

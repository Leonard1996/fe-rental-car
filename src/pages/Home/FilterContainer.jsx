import Filter from '../../components/Filter';

export default function FilterContainer({ filters, callback, selectedFilters }) {
  return (
    <div style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none', paddingLeft: '1.25rem' }}>
      {filters.map(({ label, showIcon = true, customStyles, id, checkIsDirty }) => {
        return (
          <div key={id} style={{ marginRight: '.5rem' }}>
            <Filter
              label={label}
              callback={callback}
              showIcon={showIcon}
              customStyles={customStyles}
              id={id}
              isDirty={checkIsDirty(selectedFilters)}
            />
          </div>
        );
      })}
    </div>
  );
}

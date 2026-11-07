document.addEventListener('DOMContentLoaded', () => {
  const search = Arcanum.$('#search'), sort = Arcanum.$('#sort');
  let timer;
  async function load() {
    Arcanum.$('#libraryGrid').innerHTML = '<div class="loading">Loading systems…</div>';
    try {
      const data = await Arcanum.api(`/api/systems?q=${encodeURIComponent(search.value)}&sort=${encodeURIComponent(sort.value)}`);
      Arcanum.$('#resultsLine').textContent = `${data.systems.length} ${data.systems.length === 1 ? 'entry' : 'entries'} found${search.value ? ` for “${search.value}”` : ''}`;
      Arcanum.$('#libraryGrid').innerHTML = data.systems.length ? data.systems.map(Arcanum.systemCard).join('') : Arcanum.emptyState('No matching systems', 'Try another title or keyword.');
    } catch (error) {
      Arcanum.$('#libraryGrid').innerHTML = Arcanum.emptyState('Couldn’t load the library', error.message);
    }
  }
  search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(load, 280); });
  sort.addEventListener('change', load); load();
});

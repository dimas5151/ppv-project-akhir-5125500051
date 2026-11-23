export function createCourseCard(course, { onDelete } = {}) {
  const item = document.createElement('li');
  item.className = 'course-item';
  item.dataset.id = String(course.id ?? '');

  const nameWrap = document.createElement('div');
  nameWrap.className = 'course-name';

  const title = document.createElement('strong');
  title.textContent = String(course.name ?? '');

  const meta = document.createElement('small');
  const sksNum = Number(course.sks) || 0;
  const gradeNum = Number(course.grade) || 0;
  meta.textContent = `${sksNum} SKS • ${gradeNum.toFixed(1)}`;

  nameWrap.append(title, meta);

  const actions = document.createElement('div');
  actions.className = 'course-actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Hapus';
  deleteBtn.setAttribute('aria-label', `Hapus mata kuliah ${String(course.name ?? '')}`);
  deleteBtn.addEventListener('click', () => {
    deleteBtn.disabled = true;
    if (typeof onDelete === 'function') {
      onDelete(course.id, item);
    }
  });

  actions.appendChild(deleteBtn);
  item.append(nameWrap, actions);
  return item;
}
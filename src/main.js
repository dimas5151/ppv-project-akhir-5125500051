import {
  courseStorageKey,
  readStoredCourses,
  readStoredProfile,
  removeCoursesByKey,
  STORAGE_KEY,
  writeStoredCourses,
  writeStoredProfile
} from './storage.js';
import {
  addCourseToList,
  clearCoursesList,
  createCourseItem,
  removeCourseById,
  validateCourseInput
} from './state.js';
import {
  animateRemoveCard,
  applyValidationErrors,
  clearFieldError,
  createDomRefs,
  openPage,
  renderCourseList,
  renderSummary,
  resetCourseForm,
  setProfileInputs,
  setProfileMessage,
  shakeForm,
  updateGradePreview,
  updateProfileDisplay,
  updateStatsProfile
} from './ui.js';

const dom = createDomRefs();

let activeName = '';
let activeNrp = '';
let courses = [];

function handleDeleteCourse(courseId, cardElement) {
  courses = removeCourseById(courses, courseId);
  writeStoredCourses(courses, activeName, activeNrp);
  renderSummary(dom, courses);
  animateRemoveCard(cardElement, () => {
    renderCourseList(dom, courses, { onDeleteCourse: handleDeleteCourse });
  });
}

function handleAddCourse() {
  const name = dom.courseNameInput.value.trim();
  const sks = Number(dom.courseSksInput.value);
  const grade = Number(dom.courseGradeSelect.value);

  const course = createCourseItem({
    id: (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : undefined,
    name,
    sks,
    grade
  });

  courses = addCourseToList(courses, course);
  writeStoredCourses(courses, activeName, activeNrp);
  resetCourseForm(dom);
  renderCourseList(dom, courses, {
    newCourseId: course.id,
    onDeleteCourse: handleDeleteCourse
  });

  if (typeof window.tampilkanToast === 'function') {
    window.tampilkanToast('Mata kuliah tersimpan');
  }
}

function handleResetAllCourses() {
  if (!courses.length) return;

  if (typeof window.bukaKonfirmasiReset === 'function') {
    window.bukaKonfirmasiReset(() => {
      courses = clearCoursesList();
      writeStoredCourses(courses, activeName, activeNrp);
      renderCourseList(dom, courses, { onDeleteCourse: handleDeleteCourse });
    });
  }
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const name = dom.profileNameInput.value.trim();
  const nrp = dom.profileNrpInput.value.trim();

  if (!name || !nrp) {
    setProfileMessage(dom, 'Nama dan NRP wajib diisi.');
    return;
  }

  try {
    let nextCourses = courses;
    const currentCourseKey = courseStorageKey(activeName, activeNrp);
    const nextCourseKey = courseStorageKey(name, nrp);

    if (currentCourseKey !== nextCourseKey) {
      nextCourses = activeNrp
        ? readStoredCourses(name, nrp)
        : readStoredCourses(name, nrp, true);

      if (activeNrp) {
        removeCoursesByKey(currentCourseKey);
        removeCoursesByKey(`${STORAGE_KEY}:${encodeURIComponent(activeNrp.trim().toLowerCase())}`);
      }
    }

    writeStoredProfile({ name, nrp });
    activeName = name;
    activeNrp = nrp;
    courses = nextCourses;
    updateProfileDisplay(dom, name);
    updateStatsProfile(dom, name, nrp);
    renderCourseList(dom, courses, { onDeleteCourse: handleDeleteCourse });
    openPage(dom, 'tasks');
    setProfileMessage(dom, 'Profil berhasil disimpan.');
  } catch (error) {
    console.error('Gagal menyimpan data profil:', error);
    setProfileMessage(dom, 'Profil gagal disimpan. Periksa penyimpanan browser.');
  }
}

function initEventListeners() {
  dom.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const validation = validateCourseInput(dom.courseNameInput.value, dom.courseSksInput.value);

    if (!validation.valid) {
      applyValidationErrors(dom, validation.errors);
      shakeForm(dom);
      return;
    }

    applyValidationErrors(dom, { name: '', sks: '' });
    handleAddCourse();
    dom.courseNameInput.focus();
  });

  dom.courseNameInput.addEventListener('input', () => {
    clearFieldError(dom, 'name');
  });

  dom.courseSksInput.addEventListener('input', () => {
    clearFieldError(dom, 'sks');
  });

  dom.resetBtn.addEventListener('click', handleResetAllCourses);
  dom.courseGradeSelect.addEventListener('change', () => updateGradePreview(dom));
  dom.profileForm.addEventListener('submit', handleProfileSubmit);

  dom.pageButtons.forEach((button) => {
    button.addEventListener('click', () => openPage(dom, button.dataset.page));
  });

  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      dom.courseNameInput.focus();
    }
  });
}

function initApp() {
  const savedProfile = readStoredProfile();
  activeName = savedProfile ? savedProfile.name : '';
  activeNrp = savedProfile ? savedProfile.nrp : '';

  setProfileInputs(dom, savedProfile);
  updateProfileDisplay(dom, activeName);
  updateStatsProfile(dom, activeName, activeNrp);

  courses = readStoredCourses(activeName, activeNrp, true);

  initEventListeners();
  openPage(dom, 'profile');
  updateGradePreview(dom, false, false);
  renderCourseList(dom, courses, { onDeleteCourse: handleDeleteCourse });
}

initApp();
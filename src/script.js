const STORAGE_KEY = 'ipk-tracker-courses';
const PROFILE_STORAGE_KEY = 'ipk-tracker-profile';
const form = document.getElementById('ipkForm');
const courseNameInput = document.getElementById('courseName');
const courseSksInput = document.getElementById('courseSks');
const courseGradeSelect = document.getElementById('courseGrade');
const gradePreview = document.getElementById('gradePreview');
const gradePreviewMark = document.getElementById('gradePreviewMark');
const gradePreviewDescription = document.getElementById('gradePreviewDescription');
const errorName = document.getElementById('errorName');
const errorSks = document.getElementById('errorSks');
const courseList = document.getElementById('courseList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const totalSksEl = document.getElementById('totalSks');
const ipkValueEl = document.getElementById('ipkValue');
const matkulCountEl = document.getElementById('matkulCount');
const gradeDistributionEl = document.getElementById('gradeDistribution');
const gradeCaptionEl = document.getElementById('gradeCaption');
const resetBtn = document.getElementById('resetBtn');
const profileForm = document.getElementById('profileForm');
const profileNameInput = document.getElementById('profileName');
const profileNrpInput = document.getElementById('profileNrp');
const profileHeading = document.getElementById('profileHeading');
const profileMessage = document.getElementById('profileMessage');
const profileAvatar = document.querySelector('.avatar');
const statsStudentName = document.getElementById('statsStudentName');
const statsStudentNrp = document.getElementById('statsStudentNrp');
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const pageButtons = document.querySelectorAll('.nav-btn');

let activeName = '';
let activeNrp = '';
let courses = [];

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return null;

    const profile = JSON.parse(saved);
    if (typeof profile.name !== 'string' || typeof profile.nrp !== 'string') {
      throw new TypeError('Format profil tidak valid.');
    }

    profileNameInput.value = profile.name;
    profileNrpInput.value = profile.nrp;
    updateProfileDisplay(profile.name);
    updateStatsProfile(profile.name, profile.nrp);
    return { name: profile.name, nrp: profile.nrp };
  } catch (error) {
    console.warn('Gagal membaca data profil:', error);
    return null;
  }
}

function updateProfileDisplay(name) {
  profileHeading.textContent = name || 'Nama mahasiswa';
  profileAvatar.alt = name ? `Foto profil ${name}` : 'Foto profil mahasiswa';
}

function updateStatsProfile(name, nrp) {
  statsStudentName.textContent = name || 'Belum diisi';
  statsStudentNrp.textContent = nrp || 'Belum diisi';
}

function updateGradePreview(animate = true, showDescription = true) {
  const gradeLabel = courseGradeSelect.selectedOptions[0].textContent.trim();
  const descriptions = {
    A: 'Sangat baik',
    B: 'Baik',
    C: 'Cukup',
    D: 'Tidak lulus'
  };
  const gradeClass = `grade-${gradeLabel.toLowerCase()}`;

  gradePreview.className = `grade-preview ${gradeClass}`;
  gradePreviewMark.textContent = gradeLabel;
  gradePreviewDescription.textContent = descriptions[gradeLabel];
  gradePreview.hidden = !showDescription;

  if (!animate || motionReduced.matches) return;
  gradePreview.classList.remove('is-changing');
  void gradePreview.offsetWidth;
  gradePreview.classList.add('is-changing');
}

function courseStorageKey(name, nrp) {
  if (!nrp) return STORAGE_KEY;
  const profileIdentity = JSON.stringify([
    name.trim().toLocaleLowerCase(),
    nrp.trim().toLocaleLowerCase()
  ]);
  return `${STORAGE_KEY}:${encodeURIComponent(profileIdentity)}`;
}

function loadCourses(name, nrp, migrateLegacy = false) {
  try {
    const storageKey = courseStorageKey(name, nrp);
    const saved = localStorage.getItem(storageKey);
    if (!saved && migrateLegacy && nrp) {
      const previousNrpKey = `${STORAGE_KEY}:${encodeURIComponent(nrp.trim().toLowerCase())}`;
      const previousNrpCourses = localStorage.getItem(previousNrpKey);
      const legacyCourses = previousNrpCourses ?? localStorage.getItem(STORAGE_KEY);
      if (!legacyCourses) return [];

      const parsedCourses = JSON.parse(legacyCourses);
      if (!Array.isArray(parsedCourses)) return [];

      localStorage.setItem(storageKey, JSON.stringify(parsedCourses));
      if (previousNrpCourses !== null) {
        localStorage.removeItem(previousNrpKey);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      return parsedCourses;
    }
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Gagal membaca data lokal:', error);
    return [];
  }
}

function saveCourses() {
  localStorage.setItem(courseStorageKey(activeName, activeNrp), JSON.stringify(courses));
}

function getTotalSks() {
  return courses.reduce((total, course) => total + Number(course.sks), 0);
}

function getIPK() {
  const totalSks = getTotalSks();
  if (!totalSks) return 0;
  const weighted = courses.reduce((total, course) => total + Number(course.sks) * Number(course.grade), 0);
  return weighted / totalSks;
}

function openPage(pageName) {
  const sections = {
    tasks: document.getElementById('tasksPage'),
    stats: document.getElementById('statsPage'),
    profile: document.getElementById('profilePage')
  };
  const activeButton = [...pageButtons].find((button) => button.dataset.page === pageName);
  const pageChanged = activeButton && !activeButton.classList.contains('is-current');

  Object.entries(sections).forEach(([page, element]) => {
    element.hidden = page !== pageName;
  });

  if (pageChanged && !motionReduced.matches && typeof sections[pageName].animate === 'function') {
    sections[pageName].animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 240, easing: 'ease-out' }
    );
  }

  pageButtons.forEach((button) => {
    const isCurrent = button.dataset.page === pageName;
    button.classList.toggle('is-current', isCurrent);
    button.setAttribute('aria-current', isCurrent ? 'page' : 'false');
  });

  if (pageChanged && !motionReduced.matches && typeof activeButton.animate === 'function') {
    activeButton.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-4px) scale(1.08)' },
        { transform: 'translateY(0) scale(1)' }
      ],
      { duration: 260, easing: 'ease-out' }
    );
  }
}

function animateNewCard(element) {
  if (motionReduced.matches || typeof element.animate !== 'function') return;

  element.animate(
    [
      { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ],
    { duration: 300, easing: 'ease-out' }
  );
}

function animateRemoveCard(element, onComplete) {
  if (motionReduced.matches || typeof element.animate !== 'function') {
    onComplete();
    return;
  }

  const animation = element.animate(
    [
      { opacity: 1, transform: 'translateX(0) scale(1)' },
      { opacity: 0, transform: 'translateX(24px) scale(0.96)' }
    ],
    { duration: 220, easing: 'ease-in', fill: 'forwards' }
  );
  animation.onfinish = onComplete;
}

function shakeForm() {
  if (motionReduced.matches || typeof form.animate !== 'function') return;
  form.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(0)' }
    ],
    { duration: 260, easing: 'ease-out' }
  );
}

function validateForm() {
  const name = courseNameInput.value.trim();
  const sks = Number(courseSksInput.value);
  let valid = true;

  errorName.textContent = '';
  errorSks.textContent = '';
  courseNameInput.classList.remove('error');
  courseSksInput.classList.remove('error');

  if (!name) {
    errorName.textContent = 'Nama mata kuliah belum diisi.';
    courseNameInput.classList.add('error');
    valid = false;
  } else if (name.length < 3) {
    errorName.textContent = 'Nama matkul minimal 3 huruf.';
    courseNameInput.classList.add('error');
    valid = false;
  }

  if (!Number.isInteger(sks) || sks < 1 || sks > 6) {
    errorSks.textContent = 'SKS harus diisi 1 sampai 6.';
    courseSksInput.classList.add('error');
    valid = false;
  }

  return valid;
}

function renderSummary() {
  const totalSks = getTotalSks();
  const ipk = getIPK();

  totalSksEl.textContent = String(totalSks);
  ipkValueEl.textContent = ipk.toFixed(2);
  matkulCountEl.textContent = String(courses.length);
  renderGradeDistribution();
}

function renderGradeDistribution() {
  const grades = [
    { label: 'A', description: 'Sangat baik', matches: (grade) => grade >= 3.5 },
    { label: 'B', description: 'Baik', matches: (grade) => grade >= 2.5 && grade < 3.5 },
    { label: 'C', description: 'Cukup', matches: (grade) => grade >= 1.5 && grade < 2.5 },
    { label: 'D', description: 'Tidak lulus', matches: (grade) => grade < 1.5 }
  ];

  gradeDistributionEl.replaceChildren();

  grades.forEach(({ label, description, matches }) => {
    const count = courses.filter((course) => matches(Number(course.grade))).length;
    const percentage = courses.length ? Math.round((count / courses.length) * 100) : 0;
    const item = document.createElement('li');
    item.className = 'grade-item';

    const itemHead = document.createElement('div');
    itemHead.className = 'grade-item-head';
    const gradeLabel = document.createElement('strong');
    gradeLabel.textContent = label;
    const gradeCount = document.createElement('span');
    gradeCount.textContent = `${description} · ${count} matkul`;
    itemHead.append(gradeLabel, gradeCount);

    const track = document.createElement('div');
    track.className = 'grade-track';
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-label', `Nilai ${label}`);
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    track.setAttribute('aria-valuenow', String(percentage));
    const fill = document.createElement('div');
    fill.className = 'grade-fill';
    fill.style.width = `${percentage}%`;
    track.appendChild(fill);

    item.append(itemHead, track);
    gradeDistributionEl.appendChild(item);
  });

  gradeCaptionEl.textContent = courses.length
    ? `Sebaran dari ${courses.length} mata kuliah yang tercatat.`
    : 'Tambahkan mata kuliah untuk melihat sebaran nilai.';
}

function renderCourseList(newCourseId = null) {
  courseList.innerHTML = '';

  if (!courses.length) {
    emptyState.hidden = false;
    taskCount.textContent = 'Belum ada data';
    renderSummary();
    return;
  }

  emptyState.hidden = true;
  taskCount.textContent = `${courses.length} mata kuliah tercatat`;

  const orderedCourses = [...courses].reverse();

  orderedCourses.forEach((course) => {
    const item = document.createElement('li');
    item.className = 'course-item';
    item.dataset.id = course.id;

    const nameWrap = document.createElement('div');
    nameWrap.className = 'course-name';
    const title = document.createElement('strong');
    title.textContent = course.name;
    const meta = document.createElement('small');
    meta.textContent = `${course.sks} SKS • ${course.grade.toFixed(1)}`;
    nameWrap.append(title, meta);

    const actions = document.createElement('div');
    actions.className = 'course-actions';
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Hapus';
    deleteBtn.setAttribute('aria-label', `Hapus mata kuliah ${course.name}`);
    deleteBtn.addEventListener('click', () => {
      deleteBtn.disabled = true;
      courses = courses.filter((item) => item.id !== course.id);
      saveCourses();
      renderSummary();
      animateRemoveCard(item, () => renderCourseList());
    });

    actions.appendChild(deleteBtn);
    item.append(nameWrap, actions);
    courseList.appendChild(item);

    if (newCourseId && course.id === newCourseId) {
      animateNewCard(item);
    }
  });

  renderSummary();
}

function addCourse() {
  const name = courseNameInput.value.trim();
  const sks = Number(courseSksInput.value);
  const grade = Number(courseGradeSelect.value);

  const course = {
    id: (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : `course-${Date.now()}`,
    name,
    sks,
    grade,
    done: false
  };

  courses.push(course);
  saveCourses();
  form.reset();
  courseSksInput.value = '3';
  updateGradePreview(false, false);
  renderCourseList(course.id);
}

function resetAllCourses() {
  if (!courses.length) return;

  bukaKonfirmasiReset(() => {
    courses = [];
    saveCourses();
    renderCourseList();
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    shakeForm();
    return;
  }

  addCourse();
  courseNameInput.focus();
});

courseNameInput.addEventListener('input', () => {
  courseNameInput.classList.remove('error');
  errorName.textContent = '';
});

courseSksInput.addEventListener('input', () => {
  courseSksInput.classList.remove('error');
  errorSks.textContent = '';
});

resetBtn.addEventListener('click', resetAllCourses);
courseGradeSelect.addEventListener('change', () => updateGradePreview());

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = profileNameInput.value.trim();
  const nrp = profileNrpInput.value.trim();

  if (!name || !nrp) {
    profileMessage.textContent = 'Nama dan NRP wajib diisi.';
    return;
  }

  try {
    let nextCourses = courses;
    const currentCourseKey = courseStorageKey(activeName, activeNrp);
    const nextCourseKey = courseStorageKey(name, nrp);

    if (currentCourseKey !== nextCourseKey) {
      nextCourses = activeNrp
        ? loadCourses(name, nrp)
        : loadCourses(name, nrp, true);

      if (activeNrp) {
        localStorage.removeItem(currentCourseKey);
        localStorage.removeItem(`${STORAGE_KEY}:${encodeURIComponent(activeNrp.trim().toLowerCase())}`);
      }
    }

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ name, nrp }));
    activeName = name;
    activeNrp = nrp;
    courses = nextCourses;
    updateProfileDisplay(name);
    updateStatsProfile(name, nrp);
    renderCourseList();
    openPage('tasks');
    profileMessage.textContent = 'Profil berhasil disimpan.';
  } catch (error) {
    console.error('Gagal menyimpan data profil:', error);
    profileMessage.textContent = 'Profil gagal disimpan. Periksa penyimpanan browser.';
  }
});

pageButtons.forEach((button) => {
  button.addEventListener('click', () => openPage(button.dataset.page));
});

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    courseNameInput.focus();
  }
});

const savedProfile = loadProfile();
activeName = savedProfile ? savedProfile.name : '';
activeNrp = savedProfile ? savedProfile.nrp : '';
courses = loadCourses(activeName, activeNrp, true);
openPage('profile');
updateGradePreview(false, false);
renderCourseList();

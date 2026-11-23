import { createCourseCard } from './komponen.js';
import {
  buildGradeDistribution,
  calculateIpk,
  calculateTotalSks
} from './state.js';

const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

export function createDomRefs() {
  return {
    form: document.getElementById('ipkForm'),
    courseNameInput: document.getElementById('courseName'),
    courseSksInput: document.getElementById('courseSks'),
    courseGradeSelect: document.getElementById('courseGrade'),
    gradePreview: document.getElementById('gradePreview'),
    gradePreviewMark: document.getElementById('gradePreviewMark'),
    gradePreviewDescription: document.getElementById('gradePreviewDescription'),
    errorName: document.getElementById('errorName'),
    errorSks: document.getElementById('errorSks'),
    courseList: document.getElementById('courseList'),
    emptyState: document.getElementById('emptyState'),
    taskCount: document.getElementById('taskCount'),
    totalSksEl: document.getElementById('totalSks'),
    ipkValueEl: document.getElementById('ipkValue'),
    matkulCountEl: document.getElementById('matkulCount'),
    gradeDistributionEl: document.getElementById('gradeDistribution'),
    gradeCaptionEl: document.getElementById('gradeCaption'),
    resetBtn: document.getElementById('resetBtn'),
    profileForm: document.getElementById('profileForm'),
    profileNameInput: document.getElementById('profileName'),
    profileNrpInput: document.getElementById('profileNrp'),
    profileHeading: document.getElementById('profileHeading'),
    profileMessage: document.getElementById('profileMessage'),
    profileAvatar: document.querySelector('.avatar'),
    statsStudentName: document.getElementById('statsStudentName'),
    statsStudentNrp: document.getElementById('statsStudentNrp'),
    pageButtons: document.querySelectorAll('.nav-btn'),
    sections: {
      tasks: document.getElementById('tasksPage'),
      stats: document.getElementById('statsPage'),
      profile: document.getElementById('profilePage')
    }
  };
}

export function setProfileInputs(dom, profile) {
  dom.profileNameInput.value = profile?.name ?? '';
  dom.profileNrpInput.value = profile?.nrp ?? '';
}

export function setProfileMessage(dom, message) {
  dom.profileMessage.textContent = message;
}

export function updateProfileDisplay(dom, name) {
  dom.profileHeading.textContent = name || 'Nama mahasiswa';
  dom.profileAvatar.alt = name ? `Foto profil ${name}` : 'Foto profil mahasiswa';
}

export function updateStatsProfile(dom, name, nrp) {
  dom.statsStudentName.textContent = name || 'Belum diisi';
  dom.statsStudentNrp.textContent = nrp || 'Belum diisi';
}

export function updateGradePreview(dom, animate = true, showDescription = true) {
  const gradeLabel = dom.courseGradeSelect.selectedOptions[0].textContent.trim();
  const descriptions = {
    A: 'Sangat baik',
    B: 'Baik',
    C: 'Cukup',
    D: 'Tidak lulus'
  };
  const gradeClass = `grade-${gradeLabel.toLowerCase()}`;

  dom.gradePreview.className = `grade-preview ${gradeClass}`;
  dom.gradePreviewMark.textContent = gradeLabel;
  dom.gradePreviewDescription.textContent = descriptions[gradeLabel] ?? '';
  dom.gradePreview.hidden = !showDescription;

  if (!animate || motionReduced.matches) return;
  dom.gradePreview.classList.remove('is-changing');
  void dom.gradePreview.offsetWidth;
  dom.gradePreview.classList.add('is-changing');
}

export function openPage(dom, pageName) {
  const activeButton = [...dom.pageButtons].find((button) => button.dataset.page === pageName);
  const pageChanged = activeButton && !activeButton.classList.contains('is-current');

  Object.entries(dom.sections).forEach(([page, element]) => {
    element.hidden = page !== pageName;
  });

  if (pageChanged && !motionReduced.matches && typeof dom.sections[pageName].animate === 'function') {
    dom.sections[pageName].animate(
      [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 240, easing: 'ease-out' }
    );
  }

  dom.pageButtons.forEach((button) => {
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

export function animateNewCard(element) {
  if (motionReduced.matches || typeof element.animate !== 'function') return;

  element.animate(
    [
      { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ],
    { duration: 300, easing: 'ease-out' }
  );
}

export function animateRemoveCard(element, onComplete) {
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

export function shakeForm(dom) {
  if (motionReduced.matches || typeof dom.form.animate !== 'function') return;
  dom.form.animate(
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

export function applyValidationErrors(dom, errors) {
  dom.errorName.textContent = errors.name || '';
  dom.errorSks.textContent = errors.sks || '';
  dom.courseNameInput.classList.toggle('error', Boolean(errors.name));
  dom.courseSksInput.classList.toggle('error', Boolean(errors.sks));
}

export function clearFieldError(dom, field) {
  if (field === 'name') {
    dom.courseNameInput.classList.remove('error');
    dom.errorName.textContent = '';
  } else if (field === 'sks') {
    dom.courseSksInput.classList.remove('error');
    dom.errorSks.textContent = '';
  }
}

export function resetCourseForm(dom) {
  dom.form.reset();
  dom.courseSksInput.value = '3';
  updateGradePreview(dom, false, false);
}

export function renderGradeDistribution(dom, courses) {
  const distribution = buildGradeDistribution(courses);
  dom.gradeDistributionEl.replaceChildren();

  distribution.forEach(({ label, description, count, percentage }) => {
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
    dom.gradeDistributionEl.appendChild(item);
  });

  dom.gradeCaptionEl.textContent = courses.length
    ? `Sebaran dari ${courses.length} mata kuliah yang tercatat.`
    : 'Tambahkan mata kuliah untuk melihat sebaran nilai.';
}

export function renderSummary(dom, courses) {
  const totalSks = calculateTotalSks(courses);
  const ipk = calculateIpk(courses);

  dom.totalSksEl.textContent = String(totalSks);
  dom.ipkValueEl.textContent = ipk.toFixed(2);
  dom.matkulCountEl.textContent = String(courses.length);
  renderGradeDistribution(dom, courses);
}

export function renderCourseList(dom, courses, { newCourseId = null, onDeleteCourse } = {}) {
  dom.courseList.replaceChildren();

  if (!courses.length) {
    dom.emptyState.hidden = false;
    dom.taskCount.textContent = 'Belum ada data';
    renderSummary(dom, courses);
    return;
  }

  dom.emptyState.hidden = true;
  dom.taskCount.textContent = `${courses.length} mata kuliah tercatat`;

  const orderedCourses = [...courses].reverse();

  orderedCourses.forEach((course) => {
    const item = createCourseCard(course, { onDelete: onDeleteCourse });
    dom.courseList.appendChild(item);

    if (newCourseId && course.id === newCourseId) {
      animateNewCard(item);
    }
  });

  renderSummary(dom, courses);
}
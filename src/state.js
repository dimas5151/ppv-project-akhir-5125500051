export const GRADE_SCALE = [
  { label: 'A', description: 'Sangat baik', matches: (grade) => grade === 4.0 },
  { label: 'A-', description: 'Sangat baik', matches: (grade) => grade === 3.75 },
  { label: 'AB', description: 'Baik', matches: (grade) => grade === 3.5 },
  { label: 'B+', description: 'Baik', matches: (grade) => grade === 3.25 },
  { label: 'B', description: 'Cukup', matches: (grade) => grade === 3.0 },
  { label: 'BC', description: 'Cukup', matches: (grade) => grade === 2.5 },
  { label: 'C', description: 'Lebih dari cukup', matches: (grade) => grade === 2.0 },
  { label: 'D', description: 'Tidak lulus', matches: (grade) => grade === 1.0 }
];

export function validateCourseInput(rawName, rawSks) {
  const name = String(rawName ?? '').trim();
  const sks = Number(rawSks);
  const errors = {
    name: '',
    sks: ''
  };

  if (!name) {
    errors.name = 'Nama mata kuliah belum diisi.';
  } else if (name.length < 3) {
    errors.name = 'Nama matkul minimal 3 huruf.';
  }

  if (!Number.isInteger(sks) || sks < 1 || sks > 6) {
    errors.sks = 'SKS harus diisi 1 sampai 6.';
  }

  return {
    valid: !errors.name && !errors.sks,
    errors,
    name,
    sks
  };
}

export function createCourseItem({ name, sks, grade, id }) {
  return {
    id: id ?? `course-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: String(name).trim(),
    sks: Number(sks),
    grade: Number(grade),
    done: false
  };
}

export function addCourseToList(courses, course) {
  return [...courses, course];
}

export function removeCourseById(courses, courseId) {
  return courses.filter((item) => item.id !== courseId);
}

export function clearCoursesList() {
  return [];
}

export function calculateTotalSks(courses) {
  return courses.reduce((total, course) => total + Number(course.sks), 0);
}

export function calculateIpk(courses) {
  const totalSks = calculateTotalSks(courses);
  if (!totalSks) return 0;
  const weighted = courses.reduce(
    (total, course) => total + Number(course.sks) * Number(course.grade),
    0
  );
  return weighted / totalSks;
}

export function buildGradeDistribution(courses) {
  const totalCount = courses.length;

  return GRADE_SCALE.map(({ label, description, matches }) => {
    const count = courses.filter((course) => matches(Number(course.grade))).length;
    const percentage = totalCount ? Math.round((count / totalCount) * 100) : 0;

    return {
      label,
      description,
      count,
      percentage
    };
  });
}
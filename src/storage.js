export const KUNCI_COURSES = 'ipk-tracker-courses:v1';
export const KUNCI_PROFILE = 'ipk-tracker-profile:v1';

export const STORAGE_KEY = KUNCI_COURSES;
export const PROFILE_STORAGE_KEY = KUNCI_PROFILE;

const memoryStorage = new Map();

function readKeySafe(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('Gagal membaca localStorage, memakai cadangan memori:', error);
    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
  }
}

function writeKeySafe(key, value) {
  memoryStorage.set(key, value);
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn('Gagal menulis ke localStorage (mungkin penuh atau diblokir):', error);
    return false;
  }
}

function removeKeySafe(key) {
  memoryStorage.delete(key);
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('Gagal menghapus kunci localStorage:', error);
    return false;
  }
}

function isValidCourseItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.name !== 'string' || item.name.trim() === '') return false;
  const sks = Number(item.sks);
  const grade = Number(item.grade);
  return Number.isFinite(sks) && sks > 0 && Number.isFinite(grade);
}

export function courseStorageKey(name = '', nrp = '') {
  if (!nrp) return KUNCI_COURSES;
  const profileIdentity = JSON.stringify([
    name.trim().toLocaleLowerCase(),
    nrp.trim().toLocaleLowerCase()
  ]);
  return `${KUNCI_COURSES}:${encodeURIComponent(profileIdentity)}`;
}

export function readStoredProfile() {
  try {
    const saved = readKeySafe(KUNCI_PROFILE);
    if (!saved) return null;

    const profile = JSON.parse(saved);
    if (!profile || typeof profile !== 'object') {
      throw new TypeError('Format profil tidak valid.');
    }
    if (typeof profile.name !== 'string' || typeof profile.nrp !== 'string') {
      throw new TypeError('Format profil tidak valid.');
    }

    return { name: profile.name, nrp: profile.nrp };
  } catch (error) {
    console.warn('Gagal membaca data profil:', error);
    return null;
  }
}

export function writeStoredProfile(profile) {
  try {
    const payload = JSON.stringify({
      name: String(profile?.name ?? ''),
      nrp: String(profile?.nrp ?? '')
    });
    return writeKeySafe(KUNCI_PROFILE, payload);
  } catch (error) {
    console.warn('Gagal menyusun data profil:', error);
    return false;
  }
}

export function readStoredCourses(name = '', nrp = '', migrateLegacy = false) {
  try {
    const storageKey = courseStorageKey(name, nrp);
    const saved = readKeySafe(storageKey);

    if (!saved && migrateLegacy && nrp) {
      const previousNrpKey = `${KUNCI_COURSES}:${encodeURIComponent(nrp.trim().toLowerCase())}`;
      const previousNrpCourses = readKeySafe(previousNrpKey);
      const legacyCourses = previousNrpCourses ?? readKeySafe(KUNCI_COURSES);
      if (!legacyCourses) return [];

      const parsedCourses = JSON.parse(legacyCourses);
      if (!Array.isArray(parsedCourses)) return [];

      const validCourses = parsedCourses.filter(isValidCourseItem);
      writeKeySafe(storageKey, JSON.stringify(validCourses));
      if (previousNrpCourses !== null) {
        removeKeySafe(previousNrpKey);
      } else {
        removeKeySafe(KUNCI_COURSES);
      }
      return validCourses;
    }

    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidCourseItem);
  } catch (error) {
    console.warn('Gagal membaca data lokal:', error);
    return [];
  }
}

export function writeStoredCourses(courses, name = '', nrp = '') {
  try {
    const safeList = Array.isArray(courses) ? courses.filter(isValidCourseItem) : [];
    return writeKeySafe(courseStorageKey(name, nrp), JSON.stringify(safeList));
  } catch (error) {
    console.warn('Gagal menyimpan data mata kuliah:', error);
    return false;
  }
}

export function removeCoursesByKey(storageKey) {
  return removeKeySafe(storageKey);
}
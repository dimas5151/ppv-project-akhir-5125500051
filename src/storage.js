export const STORAGE_KEY = 'ipk-tracker-courses';
export const PROFILE_STORAGE_KEY = 'ipk-tracker-profile';

export function courseStorageKey(name = '', nrp = '') {
  if (!nrp) return STORAGE_KEY;
  const profileIdentity = JSON.stringify([
    name.trim().toLocaleLowerCase(),
    nrp.trim().toLocaleLowerCase()
  ]);
  return `${STORAGE_KEY}:${encodeURIComponent(profileIdentity)}`;
}

export function readStoredProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return null;

    const profile = JSON.parse(saved);
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
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
    name: profile.name,
    nrp: profile.nrp
  }));
}

export function readStoredCourses(name = '', nrp = '', migrateLegacy = false) {
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

export function writeStoredCourses(courses, name = '', nrp = '') {
  localStorage.setItem(courseStorageKey(name, nrp), JSON.stringify(courses));
}

export function removeCoursesByKey(storageKey) {
  localStorage.removeItem(storageKey);
}
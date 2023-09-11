export function createPhoneMask(string) {
	return string.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export const maskPhoneNumber = (phone) => {
	return createPhoneMask(phone);
};

export function isNullUndefinedOrEmpty(value) {
	return value === undefined || value === null || value.trim().length === 0;
}

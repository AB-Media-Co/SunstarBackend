// Constants for validation patterns
export const ROLE_ENUM = ['superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer'];

export const PHONE_REGEX = /^[0-9]{10}$/;

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
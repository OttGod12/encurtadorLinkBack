export function isValidUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function sanitizeString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export function isValidId(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

export function isAlphaNumericCode(value, maxLength = 10) {
  if (typeof value !== "string") return false;
  const re = new RegExp(`^[A-Za-z0-9]{1,${maxLength}}$`);
  return re.test(value);
}

export function validateCreatePayload(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push("Corpo da requisição ausente ou inválido");
    return { valid: false, errors };
  }

  const { url_original, legenda } = body;

  if (!isNonEmptyString(url_original)) {
    errors.push("Campo 'url_original' é obrigatório");
  } else if (!isValidUrl(url_original)) {
    errors.push("Campo 'url_original' deve ser uma URL válida (http/https)");
  }

  if (legenda !== undefined && legenda !== null) {
    if (typeof legenda !== "string") errors.push("Campo 'legenda' deve ser texto");
    else if (legenda.trim().length > 255) errors.push("Campo 'legenda' deve ter no máximo 255 caracteres");
  }

  return { valid: errors.length === 0, errors };
}

export function validateUpdatePayload(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push("Corpo da requisição ausente ou inválido");
    return { valid: false, errors };
  }

  const { url_original, legenda } = body;

  if ((url_original === undefined || url_original === null) && (legenda === undefined || legenda === null)) {
    errors.push("Ao menos um dos campos 'url_original' ou 'legenda' deve ser fornecido");
  }

  if (url_original !== undefined && url_original !== null) {
    if (!isNonEmptyString(url_original)) {
      errors.push("Campo 'url_original' inválido");
    } else if (!isValidUrl(url_original)) {
      errors.push("Campo 'url_original' deve ser uma URL válida (http/https)");
    }
  }

  if (legenda !== undefined && legenda !== null) {
    if (typeof legenda !== "string") errors.push("Campo 'legenda' deve ser texto");
    else if (legenda.trim().length > 255) errors.push("Campo 'legenda' deve ter no máximo 255 caracteres");
  }

  return { valid: errors.length === 0, errors };
}

export function validateRedirectCode(code) {
  const maxLength = 10;
  if (!isNonEmptyString(code)) return { valid: false, error: "Código ausente" };
  if (!isAlphaNumericCode(code, maxLength)) return { valid: false, error: "Código inválido" };
  return { valid: true };
}

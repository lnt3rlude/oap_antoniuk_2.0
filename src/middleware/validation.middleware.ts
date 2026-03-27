import { Request, Response, NextFunction } from 'express';

export const validateAccessRequest = (req: Request, res: Response, next: NextFunction) => {
  const { userName, date, accessType, status, comments } = req.body;
  const errors: string[] = [];

  // 6.1. Перевірка обов’язкових полів (Required)
  if (!userName) errors.push("Поле 'userName' є обов'язковим.");
  if (!date) errors.push("Поле 'date' є обов'язковим.");
  if (!accessType) errors.push("Поле 'accessType' є обов'язковим.");

  // 6.2. Перевірка типів та форматів
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/; 
  if (date && !isoDateRegex.test(date)) {
    errors.push("Поле 'date' повинно бути у форматі ISO (YYYY-MM-DDTHH:mm).");
  }

  const validAccessTypes = ['Read', 'Write', 'Admin'];
  if (accessType && !validAccessTypes.includes(accessType)) {
    errors.push(`'accessType' має бути одним із: ${validAccessTypes.join(', ')}.`);
  }

  const validStatuses = ['Pending', 'Approved', 'Rejected'];
  // Перевіряємо статус, тільки якщо він надісланий (бо у формі є default 'Pending')
  if (status && !validStatuses.includes(status)) {
    errors.push(`'status' має бути одним із: ${validStatuses.join(', ')}.`);
  }

  // 6.3. Перевірка довжин/діапазонів
  if (userName && (userName.length < 3 || userName.length > 100)) {
    errors.push("userName має бути від 3 до 100 символів.");
  }

  if (comments && comments.length > 500) {
    errors.push("Коментар не може перевищувати 500 символів.");
  }

  // 6.4 + 7.2. Формування єдиної помилки через next()
  if (errors.length > 0) {
    return next({
      statusCode: 400,
      code: "VALIDATION_ERROR",
      message: "Invalid request body",
      details: errors
    });
  }

  next(); // Якщо помилок немає — ідемо далі
};
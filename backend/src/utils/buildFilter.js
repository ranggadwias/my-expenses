export const buildFilterFromQuery = (query, userId) => {
  const filter = { userId };

  if (query.type) {
    const normalizedType = query.type.toLowerCase();
    if (normalizedType === "expense" || normalizedType === "income") {
      filter.type = normalizedType;
    }
  }

  if (query.category) filter.category = query.category;

  if (query.minAmount || query.maxAmount) {
    filter.amount = {};
    const min = parseFloat(query.minAmount);
    const max = parseFloat(query.maxAmount);
    if (!isNaN(min)) filter.amount.$gte = min;
    if (!isNaN(max)) filter.amount.$lte = max;
    if (Object.keys(filter.amount).length === 0) delete filter.amount;
  }

  if (query.note) filter.note = query.note;

  if (query.startDate || query.endDate) {
    filter.date = {};
    const start = new Date(query.startDate);
    const end = new Date(query.endDate);
    if (!isNaN(start.getTime())) filter.date.$gte = start;
    if (!isNaN(end.getTime())) filter.date.$lte = end;
    if (Object.keys(filter.date).length === 0) delete filter.date;
  }

  return filter;
};

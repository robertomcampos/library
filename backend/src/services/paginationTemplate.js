module.exports = (data, limit, page, total) => {
    return {
        content: data,
        limit,
        page,
        total
    }
} 
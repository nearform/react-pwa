const PAGE_SIZE = 30 // TODO: this should be shared config and either passed in request or shared with server

export const buildLinks = (pathname, currentCount) => {
  const pathParts = pathname.split('/')
  const currentPage = parseInt(pathname.split('page/')[1]) || 1
  const nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  const prevPage = Number.isInteger(currentPage) && currentPage > 2 ? currentPage - 1 : null

  if (!pathParts[1] || pathParts[1] === 'page') {
    return {
      currentPage,
      prevLinkEnabled: currentPage >= 2,
      nextLinkEnabled: !(currentCount < PAGE_SIZE),
      prevLink: Number.isInteger(currentPage) && currentPage > 2 ? `/page/${prevPage}` : '/',
      nextLink: `/page/${nextPage}`,
    }
  }

  return {
    currentPage,
    prevLinkEnabled: currentPage >= 2,
    nextLinkEnabled: !(currentCount < PAGE_SIZE),
    prevLink:
      Number.isInteger(currentPage) && currentPage > 2 ? `/${pathParts[1]}/page/${prevPage}` : `/${pathParts[1]}`,
    nextLink: `/${pathParts[1]}/page/${nextPage}`,
  }
}

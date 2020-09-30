import React, {Component} from 'react'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}

class Pagination extends Component {
  constructor(props) {
    super(props)
    const {totalProducts = null, pageLimit = 30, pageNeighbours = 0} = props

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30
    this.totalProducts = typeof totalProducts === 'number' ? totalProducts : 0

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0
    this.totalPages = Math.ceil(this.totalProducts / this.pageLimit)
    this.state = {currentPage: 1}
  }

  fetchPageNumbers = () => {
    const totalPages = this.totalPages
    const currentPage = this.state.currentPage
    const pageNeighbours = this.pageNeighbours
    const totalNumbers = this.pageNeighbours * 2 + 4
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(1, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }
      return ['<<', ...pages, '>>']
    }
    return range(1, totalPages)
  }

  componentDidMount() {
    this.gotoPage(1)
  }

  gotoPage = page => {
    const {onPageChanged = f => f} = this.props
    const currentPage = Math.max(0, Math.min(page, this.totalPages))
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalProducts: this.totalProducts
    }
    this.setState({currentPage}, () => onPageChanged(paginationData))
  }

  handleClick = page => evt => {
    evt.preventDefault()
    if (page === '<<') page = 1
    if (page === '>>') page = this.totalPages
    this.gotoPage(page)
  }

  handleMoveLeft = evt => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage - 1)
  }

  handleMoveRight = evt => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage + 1)
  }

  render() {
    if (!this.totalProducts || this.totalPages === 1) return null

    const {currentPage} = this.state
    const pages = this.fetchPageNumbers()

    return (
      <div className="pagination-div">
        <div>
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-disabled="true"
                      onClick={this.handleMoveLeft}
                    >
                      Prev{' '}
                    </a>
                  </li>
                )
              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-disabled="true"
                      onClick={this.handleMoveRight}
                    >
                      Next
                    </a>
                  </li>
                )
              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? ' active' : ''
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={this.handleClick(page)}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default Pagination

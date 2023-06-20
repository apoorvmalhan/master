import React from 'react'
export default function News() {
    return (
        <div className='container'>
            <div className="card my-5" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">News</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Sports News</h6>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </p>
                    <a href="https://www.hindustantimes.com/cricket/ireland-vs-england-live-cricket-score-t20-world-cup-2022-today-match-ire-vs-eng-latest-scorecard-at-melbourne-mcg-101666751879498.html#" className="card-link">
                        Card link
                    </a>
                    <a href="/" className="card-link">
                        Another link
                    </a>
                </div>
            </div>

        </div>
    )
}

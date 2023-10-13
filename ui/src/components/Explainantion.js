import React from 'react';

function TokenExplanation({ explanation }) {
    let maxAbsoluteRelevance = 0;

    explanation.forEach(function (token) {
        if (token.hasOwnProperty('relevance')) {
            const absoluteRelevance = Math.abs(token['relevance']);
            maxAbsoluteRelevance = absoluteRelevance > maxAbsoluteRelevance ? absoluteRelevance : maxAbsoluteRelevance;
        }
    });

    const scale = (x) => {
        return Math.pow(x, 1)
    }

    const tokenElements = explanation.map((token, index) => {
        const word = token['token'];
        if (word === '\n') {
            return <br key={index} />;
        } else {
            const nodeStyle = {};
            const tokenTooltip = [];

            if (token.hasOwnProperty('relevance')) {
                const relevance = token['relevance'];
                let intensity;
                let color;

                if (relevance >= 0) {
                    intensity = scale(relevance / maxAbsoluteRelevance);
                    color = `rgba(255, 0, 0, ${intensity})`;
                } else {
                    intensity = scale(-relevance / maxAbsoluteRelevance);
                    color = `rgba(0, 0, 255, ${intensity})`;
                }

                tokenTooltip.push(<span className="tokentooltip" key={`tooltip-${index}`}>{relevance}</span>);
                nodeStyle.backgroundColor = color;
            } else {
                nodeStyle.backgroundColor = 'rgba(0, 0, 0, 0)';
                tokenTooltip.push(<span className="tokentooltip" key={`tooltip-${index}`}>Ignored</span>);
            }

            return (
                <span className="token" style={nodeStyle} key={index}>
                    {word}
                    {/* {tokenTooltip} */}
                </span>
            );
        }
    });

    return <div>{tokenElements}</div>;
}

export default TokenExplanation;

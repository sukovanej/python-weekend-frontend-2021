interface LizardProps {
    position: number
}

export default function Lizard({position}: LizardProps) {
    return (
        <div id="barcelona"
             style={{backgroundImage: "url('./lizard2.png')",
                 backgroundSize: "cover",
                 animationPlayState: position ? 'running' : 'paused',
                 display: position ? 'inline-block' : 'none',
                 top: position
        }}>

        </div>
    );
}

interface LizardProps {
    isEnabled: boolean
}

export default function Lizard({isEnabled}: LizardProps) {
    return (
        <div id="barcelona"
             style={{backgroundImage: "url('./lizard2.png')",
                 backgroundSize: "cover",
                 animationPlayState: isEnabled ? 'running' : 'paused',
                 display: isEnabled ? 'inline-block' : 'none'
        }}>

        </div>
    );
}

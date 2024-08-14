import AcesseLogo from '../../assets/SVG/acesse.svg?react';

export function IconAcesse(){
    return(
        <AcesseLogo 
            style={
                { 
                    width: '150px', 
                    height: '40px', 
                    display: 'flex', 
                    justifyContent: 'flex-start' 
                }
            }
        />
    )
}
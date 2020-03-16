import {StyleSheet} from 'react-native';
import { fonts } from './../constants'
import theme from './theme.style';
import { red } from 'ansi-colors';

export default StyleSheet.create({
    shadowContainer: {
        shadowOpacity: 0.07,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 1 },
        zIndex: 1
    },
    menuContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingTop: 25,
        paddingBottom: 0,
        overflow: 'hidden',
        zIndex: 1        
    },
    subMenuContainer: {
        paddingLeft: 30        
    },
    menuHeaderContainer: {
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    menuHeaderContainerFlex: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%'
    },
    menuHeaderAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 13
    },
    menuHeaderName: {
        fontFamily: fonts.OpenSansBold,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 7,
        marginBottom: 2
    },
    menuHeaderText: {
        color: '#73767A',
        fontSize: 13,
        lineHeight: 16,
        width: 200
    },
    menuListItem: {
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderColor: '#DFDFDF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subMenuListItem: {
        fontFamily: fonts.OpenSansRegular,
        fontSize: 13, 
        paddingTop: 20
    },
    firstSubMenuListItem: {
        paddingTop: 0       
    },
    menuListItemTitle: {
        fontFamily: fonts.OpenSansRegular
    },
    menuListItemIcon: {
        width: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    menuListItemDesc: {
        fontFamily: fonts.OpenSansRegular,
        fontSize: 11,
        color: '#A5AAAF'
    }
});
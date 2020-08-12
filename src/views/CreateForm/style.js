import { yellow } from '@material-ui/core/colors'

const style = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: 16
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleView: {
    display: 'flex',
    alignItems: 'center'
  },
  chipStyle: {
    backgroundColor: yellow[700],
    minWidth: theme.spacing(20)
  },
  chipIcon: {
    fontSize: theme.spacing(3),
    color: theme.palette.grey[100]
  }
})

export default style

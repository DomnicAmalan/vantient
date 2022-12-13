import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material'
import {Formik} from 'formik'
import { useDispatch } from 'react-redux';
import { addUrl } from '@/app/store/reducers/app';
import { useAppSelector } from '@/app/store/store';
import AddIcon from '@mui/icons-material/Add';
import styles from './addwebsite.module.scss';

const AddWebsite = () => {

  // Styles

  // redux
  const dispatch = useDispatch()
  const { 
    urladdloading,
    urladdresult,
  } = useAppSelector(state => state?.app)

  return (
    <Grid className={styles.maincontainer} flexDirection='column' container alignItems='center' justifyContent={'center'}>
      <Formik
        initialValues={{ url: '' }}
        onSubmit={(values, { resetForm }) => {
          dispatch(addUrl(values))
          resetForm()
        }}
      >
       {({
         values,
         handleChange,
         handleSubmit,
         isValid,
         handleBlur
       }) => (
          <>
            <TextField  
              placeholder='Enter url to add'
              fullWidth
              name='url'
              onChange={handleChange('url')}
              required
              value={values?.url}
              onBlur={handleBlur('url')}
            />
            <Button 
              sx={{ marginY: 1 }} 
              variant='contained' 
              disabled={!isValid ||  urladdloading} 
              onClick={(data: any) => handleSubmit(data)}
            >
              {urladdloading ? <CircularProgress />: 'Add URL'}
            </Button>
            
          </>
       )}
       </Formik>
       {urladdresult ? 
          <Card>
            <CardMedia
              component="img"
              alt={urladdresult?.title}
              height="100%"
              width="100%"
              src={
                !/^(?:f|ht)tps?\:\/\//.test(urladdresult?.image) ?  
                  `https:${urladdresult?.image}`: urladdresult?.image
              }
            />
            <CardContent>
              <Link href={urladdresult.url} target='_blank'>
                {urladdresult?.url}
              </Link>
              <Typography gutterBottom variant="h5" component="div">
                {urladdresult?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               {urladdresult?.description}
              </Typography>
              <Grid container marginY={2} className={styles.categoryContainer}>
                {urladdresult?.category?.map((item: string) => {
                  return (
                    <Typography className={styles.category}>
                      {item}
                    </Typography>
                  )
                })}
                <AddIcon />
              </Grid>
              <Grid className={styles.formaccesscontainer}>
                {urladdresult?.formaccess && Object?.keys(urladdresult?.formaccess)?.map((item: string) => {
                  return (
                    <Grid container flexDirection={'row'}>
                      <Typography className={styles.typo}>
                        {item}: 
                      </Typography>
                      <Typography className={styles.typovalue}>
                        {urladdresult?.formaccess[item]}
                      </Typography>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
            <CardActions>
              <Button 
                sx={{color: '#18BF9C'}} 
                variant='outlined' 
                size="small"
              >
                Add Extra property manually
              </Button>
              <Button 
                sx={{color: '#18BF9C'}} 
                variant='outlined' 
                size="small"
              >
                Add Form Access Property or Create Privilege
              </Button>
            </CardActions>
          </Card>: 'No Website to show'
        }
    </Grid>    
  )
}

export default AddWebsite
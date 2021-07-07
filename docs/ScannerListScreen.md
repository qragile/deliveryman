import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createScanner,
  deleteScanner,
  listScanners,
} from '../actions/scannerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  SCANNER_CREATE_RESET,
  SCANNER_DELETE_RESET,
} from '../constants/scannerConstants';

export default function ScannerListScreen(props) {
  const { pageNumber = 1 } = useParams();
  const scannerList = useSelector((state) => state.scannerList);
  const { loading, error, scanners, page, pages } = scannerList;

  const scannerCreate = useSelector((state) => state.scannerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    Scanner: createdScanner,
  } = scannerCreate;

  const scannerDelete = useSelector((state) => state.scannerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = scannerDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SCANNER_CREATE_RESET });
      props.history.push(`/scanner/${createdScanner._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: SCANNER_DELETE_RESET });
    }
    dispatch(
      listScanners({ delivery: deliveryMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdScanner,
    dispatch,
    props.history,
    deliveryMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (scanner) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteScanner(scanner._id));
    }
  };
  const createHandler = () => {
    dispatch(createScanner());
  };
  return (
    <div>
      <div className="row">
        <h1>List Load</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Crear Scanners
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>UserLoad</th>
                <th>Sender id</th>
               
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scanners.map((scanner) => (
                <tr key={scanner._id}>
                  <td>{scanner._id}</td>
                  <td>{scanner.userLoad}</td>
                  <td>{scanner.sender_id}</td>
                 
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/scanner/${scanner._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(scanner)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/scannerlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
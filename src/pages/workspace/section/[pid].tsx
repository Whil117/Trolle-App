import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/SvgDynamic'
import ButtonCancel from '@Components/Button/cancel'
import { AtomWSC } from '@Components/Column/Column'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import {
  WorkspaceInput,
  WorkspaceLabel,
  WorkspaceSectioTextArea,
} from '@Styles/pages/workspace/section'
import { workSpaceSection } from '@Types/components/Column/types'
import { typeWorkspaceColumns } from '@Types/pages/workspace/types'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

interface IProps {
  pid: string
  id: string
}

const WorkspaceSection: FC<IProps> = ({ pid, id }) => {
  const [workspaceSection, setWorkspaceSection] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)
  const [section, setSection] = useState<workSpaceSection>(
    {} as workSpaceSection
  )
  const router = useRouter()
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setWorkspaceSection({
      ...workspaceSection,

      [pid]: workspaceSection[pid].map((item) => {
        if (item.id_wcs === section.id_wcs) {
          return { ...section, [e.target.name]: e.target.value }
        }
        return item
      }),
    })
  }

  useEffect(() => {
    const FilterWorkspaceSection = workspaceSection[pid]?.filter(
      (item) => item.id_wcs === id
    )[0]
    Object.keys(workspaceSection).length > 0 &&
      setSection(FilterWorkspaceSection)
  }, [workspaceSection, pid, id])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onloadend = (event) => {
      if (event.target) {
        setWorkspaceSection({
          ...workspaceSection,

          [pid]: workspaceSection[pid].map((item) => {
            if (item.id_wcs === section.id_wcs) {
              return { ...section, image_wcs: event?.target?.result }
            }
            return item
          }),
        })
      }
    }
  }

  const handleDelete = () => {
    setWorkspaceSection({
      ...workspaceSection,

      [pid]: workspaceSection[pid].filter(
        (item) => item.id_wcs !== section.id_wcs
      ),
    })
    router.back()
  }
  const handleDeleteImage = () => {
    setWorkspaceSection({
      ...workspaceSection,
      [pid]: workspaceSection[pid].map((item) => {
        if (item.id_wcs === section.id_wcs) {
          return { ...section, image_wcs: '' }
        }
        return item
      }),
    })
  }
  return (
    <div>
      <h1>View Section</h1>
      <Wrapper
        customstyle={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Wrapper
          customstyle={css`
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          `}
        >
          <AtomImage
            src={section?.image_wcs || '/images/no-image.png'}
            alt={section?.title_wcs}
            width={275}
            height={275}
          />
          {section?.image_wcs ? (
            <ButtonCancel
              ArrowFn={handleDeleteImage}
              style={css`
                background: white;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 0;
                /* height: 40px;
                 */
                width: 40px;
                margin: 10px;
                position: fixed;
              `}
            />
          ) : (
            <WorkspaceLabel htmlFor="image">
              <SvgDynamic href="/icons/clip" />
            </WorkspaceLabel>
          )}
          <input
            type="file"
            id="image"
            onChange={handleImage}
            style={{ display: 'none' }}
          />
        </Wrapper>
        <Wrapper
          customstyle={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 0 0 40px;
          `}
        >
          <WorkspaceInput
            type="text"
            name="title_wcs"
            value={section?.title_wcs}
            onChange={handleChange}
          />
          <WorkspaceSectioTextArea
            name="text_wcs"
            cols={30}
            rows={10}
            onChange={handleChange}
            value={section?.text_wcs || ''}
            defaultValue={section?.text_wcs || ''}
          ></WorkspaceSectioTextArea>
        </Wrapper>
        <div>
          <ButtonCancel ArrowFn={handleDelete} />
        </div>
      </Wrapper>
    </div>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { pid, id } = context.query
  return {
    props: {
      pid,
      id,
    },
  }
}

export default WorkspaceSection

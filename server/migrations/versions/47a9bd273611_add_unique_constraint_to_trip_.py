"""add unique constraint to trip destination

Revision ID: 47a9bd273611
Revises: 6d217d6a55fc
Create Date: 2023-09-29 17:13:16.618833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47a9bd273611'
down_revision = '6d217d6a55fc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.create_unique_constraint('unique_destination_constraint', ['destination'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
